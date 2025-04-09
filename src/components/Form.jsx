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

	// Utmaning: det går att flytta det mesta av valideringslogiken till en separat funktion i en annan fil
	// function validateForm(data, touched) --> return { css, message, formIsValid }

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
				<input
					className={css.email}
					value={data.email}
					onChange={event => setData({ ...data, email: event.target.value })}
					onBlur={() => setTouched({ ...touched, email: true })}
					/>
				<p className="error"> {message.email} </p>

			</section>

			<section className="form-field">
				<button disabled={!formIsValid}> Spara </button>
			</section>
		</div>
	)
}

export default Form
