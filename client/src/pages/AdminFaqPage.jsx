import React from 'react';
import { Collapse } from 'antd';
import './AdminFaqPage.css';

const faqData = [
  {
    key: '1',
    question: 'What do we do',
    answer: 'In Bonorum out a need Internet web Finibus attributed even have et over use structures, scrambled uses or known. De variations of in there hidden you use randomised Lorem with the Malorum isnt believable. passages Malorum even Bonorum free with Bonorum for generator Lorem slightly Lorem many even chunks non-characteristic suffered looks chunks are injected Latin the dont a or.',
  },
  {
    key: '2',
    question: 'Getting started with Untitled',
    answer: 'Here is some dummy text for the second question. It provides a brief overview of how to get started.',
  },
  {
    key: '3',
    question: 'Install Untitled',
    answer: 'Installation instructions go here. Follow step one, step two, and step three to complete the installation successfully.',
  },
  {
    key: '4',
    question: 'The Messenger',
    answer: 'This section explains the messenger functionality and how it helps you communicate with your team effectively.',
  },
  {
    key: '5',
    question: 'One next-gen inbox',
    answer: 'Discover the features of our next-gen inbox designed to boost your productivity and streamline your workflow.',
  },
  {
    key: '6',
    question: 'How does support work?',
    answer: 'Our support team is available 24/7. You can reach out via email, chat, or phone for any assistance you might need.',
  },
];

const AdminFaqPage = () => {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px', width: '100%', padding: '24px' }}>
      
      {/* Header Section (Centered) */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: 'var(--alo-blanco)' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ margin: 0, fontSize: '15px', color: 'var(--alo-gris)', lineHeight: '1.6' }}>
          Quick answer to questions you may have about Untitled UI And billing. Can't find what you're looking for? check out our full document.
        </p>
      </div>

      {/* Accordion / Collapse Section */}
      <div style={{ background: 'var(--alo-oscuro2)', borderRadius: '8px', border: '1px solid var(--alo-borde)', overflow: 'hidden' }}>
        <Collapse 
          defaultActiveKey={['1']} 
          ghost 
          expandIconPosition="end"
          className="faq-collapse"
          items={faqData.map(item => ({
            key: item.key,
            label: <span className="faq-panel-title">{item.question}</span>,
            children: (
              <p style={{ color: 'var(--alo-gris)', margin: 0, fontSize: '14px', lineHeight: '1.6', paddingRight: '24px' }}>
                {item.answer}
              </p>
            ),
            style: { borderBottom: item.key !== faqData[faqData.length -1].key ? '1px solid var(--alo-borde)' : 'none' }
          }))}
        />
      </div>

    </div>
  );
};

export default AdminFaqPage;
