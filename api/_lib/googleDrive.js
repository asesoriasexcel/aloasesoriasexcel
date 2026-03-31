import { google } from 'googleapis';

const DRIVE_FOLDER_ID = '1xC-MfPmrB3OxQcRVGdk032vAmwN-nywd';

function getAuthClient() {
  const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  return new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
}

/**
 * Busca un archivo en la carpeta de Drive por nombre exacto.
 * @param {string} fileName - Nombre del archivo en Drive
 * @returns {string|null} fileId o null si no existe
 */
export async function findFileByName(fileName) {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.list({
    q: `'${DRIVE_FOLDER_ID}' in parents and name = '${fileName}' and trashed = false`,
    fields: 'files(id, name)',
    pageSize: 1,
  });

  return res.data.files?.[0]?.id ?? null;
}

/**
 * Genera un link de descarga temporal (signed URL via webContentLink no es posible en Drive API v3
 * para cuentas de servicio — en su lugar generamos un token de acceso + URL directa).
 * @param {string} fileId
 * @returns {string} URL de descarga directa
 */
export async function getDownloadUrl(fileId) {
  const auth = getAuthClient();
  const accessToken = await auth.getAccessToken();
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${accessToken.token}`;
}
