export class ZodValidationError extends Error {
    public error: any;
    constructor(error: any) {
        super("Validation error")
        this.name = "ZodValidationError";
        this.error = error;
    }
}