import { useState } from 'react'
import './Form.css'
import Joi from 'joi'

const schema = Joi.object({

	name: Joi.string()
		.min(1)
		.required(),

	email: Joi.string()
		.email({ tlds: false })
		.required()

})

const Form = () => {
	const [data, setData] = useState({ name: '', email: '' })
	const [touched, setTouched] = useState({ name: false, email: false })

	let css = {
		name: '',
		email: ''
	}
	if( touched.name ) css.name = 'valid'

	let message = {
		name: '',
		email: ''
	}
	const results = schema.validate(data)
	console.log('Form: validation results: ', results)
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
		})
	}

	return (
		<div className="form">

			<section className="form-field">
				<label> Namn </label>
				<input
					className={css.name}
					value={data.name}
					onChange={event => setData({ ...data, name: event.target.value })}
					onBlur={() => setTouched({ ...touched, name: true })}
					/>
				<p className="error"> {message.name} </p>

				<label> E-post </label>
				<input />
				<p className="error"></p>

			</section>

			<section className="form-field">
				<button> Spara </button>
			</section>
		</div>
	)
}

export default Form
