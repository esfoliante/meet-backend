import Joi from 'joi';

export default function validate(data: []): Joi.ValidationResult {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().min(4).required().email(),
		password: Joi.string().min(8).required(),
		gender: Joi.string().required(),
		birthDate: Joi.date().required(),
	});

	return schema.validate(data);
}
