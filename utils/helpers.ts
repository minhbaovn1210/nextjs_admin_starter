import moment from "moment";

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function lowercase(string: string) {
  return string.toLowerCase();
}

function toCamelCase(str: string) {
  return str
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/[^\w\s]/g, "")
    .replace(/ (.)/g, function ($1) {
      return $1.toUpperCase();
    })
    .replace(/ /g, "");
}

export function objectToCamelCase(origObj: any) {
  return Object.keys(origObj).reduce(function (newObj: any, key) {
    let val = origObj[key];
    let newVal = typeof val === "object" ? objectToCamelCase(val) : val;
    newObj[toCamelCase(key)] = newVal;
    return newObj;
  }, {});
}

export const sorterDateHelper = (
  dateA: string,
  dateB: string,
  format?: string
) => {
  if (!dateA && dateB) return -1;
  else if (dateA && !dateB) return 1;
  else if (!dateA && !dateB) return 0;

  let dateDiff = null;
  if (format) {
    dateDiff = moment(dateA, format).diff(moment(dateB, format));
  } else {
    dateDiff = moment(dateA).diff(moment(dateB));
  }

  if (dateDiff > 0) return 1;
  else if (dateDiff < 0) return -1;
  else return 0;
};

export const sorterStringHelper = (s1: string, s2: string) =>
  s1 < s2 ? -1 : s1 > s2 ? 1 : 0;
