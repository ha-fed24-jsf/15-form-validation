import { useState } from 'react'
import './Form.css'
import { validateForm } from '../data/validation.js'


const Form = () => {
	const [data, setData] = useState({ name: '', email: '' })
	const [touched, setTouched] = useState({ name: false, email: false })

	// Valideringslogiken ligger i en annan fil
	const { css, message, formIsValid } = validateForm(data, touched)


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
