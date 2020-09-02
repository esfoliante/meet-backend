import Joi from 'joi';

export default function validate(data: []): Joi.ValidationResult {
	const schema = Joi.object({
		email: Joi.string().min(4).required().email(),
		password: Joi.string().required(),
	});

	return schema.validate(data);
}
