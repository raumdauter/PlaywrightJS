const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

function normalizeCellValue(value) {
  if (value === undefined || value === null) return '';
  return String(value).trim();
}

function normalizeRow(row = {}) {
  const normalized = {};
  for (const [key, value] of Object.entries(row)) {
    normalized[String(key).trim()] = normalizeCellValue(value);
  }
  return normalized;
}

function getSheetHeaders(worksheet) {
  const rows = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    defval: '',
    blankrows: false,
    raw: false
  });

  if (!rows.length) return [];

  return rows[0]
    .map((header) => normalizeCellValue(header))
    .filter((header) => header !== '');
}

function validateWorkbookSchema(workbook, schema = {}, workbookPath = '') {
  const requiredSheetNames = Object.keys(schema);
  const availableSheetNames = workbook.SheetNames || [];
  const validationIssues = [];

  const missingSheets = requiredSheetNames.filter((sheetName) => !availableSheetNames.includes(sheetName));
  if (missingSheets.length) {
    validationIssues.push(
      `[Schema] Missing required sheet(s): ${missingSheets.join(', ')}. Available sheet(s): ${availableSheetNames.join(', ') || '(none)'}`
    );
  }

  for (const sheetName of requiredSheetNames) {
    if (!availableSheetNames.includes(sheetName)) continue;

    const worksheet = workbook.Sheets[sheetName];
    const headers = getSheetHeaders(worksheet);
    const requiredColumns = schema[sheetName]?.requiredColumns || [];
    const missingColumns = requiredColumns.filter((columnName) => !headers.includes(columnName));

    if (missingColumns.length) {
      validationIssues.push(
        `[Schema] Sheet "${sheetName}" is missing required column(s): ${missingColumns.join(', ')}. Found column(s): ${headers.join(', ') || '(none)'}`
      );
    }
  }

  if (validationIssues.length) {
    const pathText = workbookPath ? ` in file: ${workbookPath}` : '';
    throw new Error(
      `[TestData] Invalid Excel schema${pathText}\n- ${validationIssues.join('\n- ')}`
    );
  }
}

function parseExcelWorkbook(excelPath, schema) {
  const resolvedPath = path.resolve(excelPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`[TestData] Excel file not found: ${resolvedPath}`);
  }

  const workbook = XLSX.readFile(resolvedPath);
  if (schema) {
    validateWorkbookSchema(workbook, schema, resolvedPath);
  }

  const sheets = {};

  for (const sheetName of workbook.SheetNames) {
    const worksheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(worksheet, {
      defval: '',
      blankrows: false,
      raw: false
    });

    sheets[sheetName] = rows.map(normalizeRow);
  }

  return {
    resolvedPath,
    sheets
  };
}

function toOptionalString(value) {
  const normalized = normalizeCellValue(value);
  return normalized === '' ? undefined : normalized;
}

function toBoolean(value, defaultValue = false) {
  if (value === undefined || value === null || String(value).trim() === '') {
    return defaultValue;
  }

  if (typeof value === 'boolean') return value;

  const normalized = String(value).trim().toLowerCase();

  if (['true', '1', 'yes', 'y', 'x'].includes(normalized)) return true;
  if (['false', '0', 'no', 'n'].includes(normalized)) return false;

  return defaultValue;
}

module.exports = {
  parseExcelWorkbook,
  validateWorkbookSchema,
  toOptionalString,
  toBoolean
};
