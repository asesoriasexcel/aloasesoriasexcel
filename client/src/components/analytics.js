import ReactGA from 'react-ga';

const TRACKING_ID = "G-Y2XH0W45YG"; // Reemplaza con tu ID
ReactGA.initialize(TRACKING_ID);

export const trackDownload = (fileName) => {
    ReactGA.event({
        category: 'Descargas',
        action: 'Descarga de archivo',
        label: fileName,
    });
};
