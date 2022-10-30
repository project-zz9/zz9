import Ajv from "ajv";

const validator = new Ajv({ strictSchema: false });

export { validator };
