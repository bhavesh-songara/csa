import { ObjectSchema, ValidationOptions } from "joi";

interface SchemaValidator {
  schema: ObjectSchema;
  data: { [key: string]: any };
  options?: ValidationOptions;
}

export const validateJoiSchema = ({
  schema,
  data,
  options,
}: SchemaValidator) => {
  const { error } = schema.validate(data, options);

  if (error) {
    throw new Error(error.message);
  }
};
