import Joi from 'joi'

const schema = Joi.object({

	name: Joi.string()
		.min(1)
		.required(),

	email: Joi.string()
		.email({ tlds: false })
		.required()

})

function validateForm(data, touched) {
	let css = {
		name: '',
		email: ''
	}
	if( touched.name ) css.name = 'valid'
	if( touched.email ) css.email = 'valid'
	// Pro-metod: använd Object.keys(touched).forEach i stället

	let message = {
		name: '',
		email: ''
	}
	const results = schema.validate(data)
	// console.log('Form: validation results: ', results)
	// if( validation fails ) css.name = 'invalid'
	if( results.error ) {
		results.error.details.forEach(e => {
			if( !touched[e.context.key] ) {
				return  // avbryt funktionen om användaren inte har touchat fältet
			}
			// Pro method
			css[e.context.key] = 'invalid'

			// Simpler version
			/*if( e.context.key === 'name' ) {
				css.name = 'invalid'
			}
			else if( e.context.key === 'email' ) {
				css.email = 'invalid'
			}*/

			if( e.context.key === 'name' ) {
				// det enda som kan bli fel, är om namn-fältet är tomt
				message.name = 'Skriv ditt namn.'
			}
			else if( e.context.key === 'email' ) {
				if( data.email === '' ) {
					message.email = 'Skriv din e-postadress.'
				} else {
					message.email = 'Skriv adressen på formatet "namn@domän.se".'
				}
			}
		})
	}
	const formIsValid = !results.error

	return { css, message, formIsValid }
}

export{ validateForm }
