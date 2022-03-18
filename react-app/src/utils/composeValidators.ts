export const composeValidators = (value: string | number, validators: ((value: string | number) => string | undefined)[]) => {
    for (const validator of validators) {
        const error = validator(value);

        if (error) {
            return error;
        }
    }

    return undefined;
};