import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FileIcon, FolderIcon, FolderOpenIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

const TreeContext = createContext(null);

const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error('useTree must be used within a Tree');
  return context;
};

const isFolderElement = (element) => {
  if (element.type) return element.type === 'folder';
  return Array.isArray(element.children);
};

const mergeExpandedItems = (currentItems, nextItems) =>
  [...new Set([...(currentItems ?? []), ...nextItems])];

const treeCollator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' });

const defaultTreeComparator = (a, b) => {
  const aIsFolder = isFolderElement(a);
  const bIsFolder = isFolderElement(b);
  if (aIsFolder !== bIsFolder) return aIsFolder ? -1 : 1;
  return treeCollator.compare(a.name, b.name);
};

const getTreeComparator = (sort) => {
  if (sort === 'none') return undefined;
  if (sort === 'default') return defaultTreeComparator;
  return sort;
};

const sortTreeElements = (elements, sort) => {
  const comparator = getTreeComparator(sort);
  const nextElements = elements.map((element) => {
    if (!Array.isArray(element.children)) return element;
    return { ...element, children: sortTreeElements(element.children, sort) };
  });
  if (!comparator) return nextElements;
  return [...nextElements].sort(comparator);
};

const renderTreeElements = (elements, sort) =>
  sortTreeElements(elements, sort).map((element) => {
    if (isFolderElement(element)) {
      return (
        <Folder
          key={element.id}
          value={element.id}
          element={element.name}
          isSelectable={element.isSelectable}
        >
          {Array.isArray(element.children)
            ? renderTreeElements(element.children, sort)
            : null}
        </Folder>
      );
    }
    return (
      <File key={element.id} value={element.id} isSelectable={element.isSelectable}>
        <span>{element.name}</span>
      </File>
    );
  });

const Tree = forwardRef(
  (
    {
      className,
      elements,
      initialSelectedId,
      initialExpandedItems,
      children,
      indicator = true,
      openIcon,
      closeIcon,
      sort = 'none',
      dir,
      onSelect,
      ...props
    },
    ref
  ) => {
    const [selectedId, setSelectedId] = useState(initialSelectedId);
    const [expandedItems, setExpandedItems] = useState(initialExpandedItems);

    const selectItem = useCallback(
      (id) => {
        setSelectedId(id);
        onSelect?.(id);
      },
      [onSelect]
    );

    const handleExpand = useCallback((id) => {
      setExpandedItems((prev) => {
        if (prev?.includes(id)) return prev.filter((item) => item !== id);
        return [...(prev ?? []), id];
      });
    }, []);

    const expandSpecificTargetedElements = useCallback((elements, selectId) => {
      if (!elements || !selectId) return;
      const findParent = (currentElement, currentPath = []) => {
        const isSelectable = currentElement.isSelectable ?? true;
        const newPath = [...currentPath, currentElement.id];
        if (currentElement.id === selectId) {
          if (isSelectable) {
            setExpandedItems((prev) => mergeExpandedItems(prev, newPath));
          } else {
            if (newPath.includes(currentElement.id)) {
              newPath.pop();
              setExpandedItems((prev) => mergeExpandedItems(prev, newPath));
            }
          }
          return;
        }
        if (Array.isArray(currentElement.children) && currentElement.children.length > 0) {
          currentElement.children.forEach((child) => findParent(child, newPath));
        }
      };
      elements.forEach((element) => findParent(element));
    }, []);

    useEffect(() => {
      if (initialSelectedId) {
        expandSpecificTargetedElements(elements, initialSelectedId);
      }
    }, [initialSelectedId, elements, expandSpecificTargetedElements]);

    const direction = dir === 'rtl' ? 'rtl' : 'ltr';
    const treeChildren =
      children ?? (elements ? renderTreeElements(elements, sort) : null);

    return (
      <TreeContext.Provider
        value={{
          selectedId,
          expandedItems,
          handleExpand,
          selectItem,
          setExpandedItems,
          indicator,
          openIcon,
          closeIcon,
          direction,
        }}
      >
        <div className={cn('size-full', className)}>
          <div ref={ref} className="relative h-full px-2" dir={dir}>
            <AccordionPrimitive.Root
              {...props}
              type="multiple"
              value={expandedItems}
              className="flex flex-col gap-1"
              dir={dir}
            >
              {treeChildren}
            </AccordionPrimitive.Root>
          </div>
        </div>
      </TreeContext.Provider>
    );
  }
);

Tree.displayName = 'Tree';

const TreeIndicator = forwardRef(({ className, ...props }, ref) => {
  const { direction } = useTree();
  return (
    <div
      dir={direction}
      ref={ref}
      className={cn(
        'bg-muted absolute left-1.5 h-full w-px rounded-md py-3 duration-300 ease-in-out hover:bg-slate-300 rtl:right-1.5',
        className
      )}
      {...props}
    />
  );
});

TreeIndicator.displayName = 'TreeIndicator';

const Folder = forwardRef(
  (
    {
      className,
      element,
      value,
      isSelectable = true,
      isSelect,
      children,
      ...props
    },
    ref
  ) => {
    const {
      direction,
      handleExpand,
      expandedItems,
      indicator,
      selectedId,
      selectItem,
      openIcon,
      closeIcon,
    } = useTree();
    const isSelected = isSelect ?? selectedId === value;

    return (
      <AccordionPrimitive.Item
        ref={ref}
        {...props}
        value={value}
        className="relative h-full overflow-hidden"
      >
        <AccordionPrimitive.Trigger
          className={cn(
            'flex items-center gap-1 rounded-md text-sm w-full',
            className,
            {
              'bg-muted rounded-md': isSelected && isSelectable,
              'cursor-pointer': isSelectable,
              'cursor-not-allowed opacity-50': !isSelectable,
            }
          )}
          disabled={!isSelectable}
          onClick={() => {
            selectItem(value);
            handleExpand(value);
          }}
        >
          {expandedItems?.includes(value)
            ? (openIcon ?? <FolderOpenIcon className="size-4" />)
            : (closeIcon ?? <FolderIcon className="size-4" />)}
          <span>{element}</span>
        </AccordionPrimitive.Trigger>
        <AccordionPrimitive.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down relative h-full overflow-hidden text-sm">
          {element && indicator && <TreeIndicator aria-hidden="true" />}
          <AccordionPrimitive.Root
            dir={direction}
            type="multiple"
            className="ml-5 flex flex-col gap-1 py-1 rtl:mr-5"
            value={expandedItems}
          >
            {children}
          </AccordionPrimitive.Root>
        </AccordionPrimitive.Content>
      </AccordionPrimitive.Item>
    );
  }
);

Folder.displayName = 'Folder';

const File = forwardRef(
  (
    {
      value,
      className,
      handleSelect,
      onClick,
      isSelectable = true,
      isSelect,
      fileIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { direction, selectedId, selectItem } = useTree();
    const isSelected = isSelect ?? selectedId === value;
    return (
      <button
        ref={ref}
        type="button"
        disabled={!isSelectable}
        className={cn(
          'flex w-full items-center gap-1 rounded-md pr-1 text-sm duration-200 ease-in-out rtl:pr-0 rtl:pl-1',
          {
            'bg-muted': isSelected && isSelectable,
          },
          isSelectable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50',
          direction === 'rtl' ? 'rtl' : 'ltr',
          className
        )}
        onClick={(event) => {
          selectItem(value);
          handleSelect?.(value);
          onClick?.(event);
        }}
        {...props}
      >
        {fileIcon ?? <FileIcon className="size-4" />}
        {children}
      </button>
    );
  }
);

File.displayName = 'File';

export { File, Folder, Tree };
