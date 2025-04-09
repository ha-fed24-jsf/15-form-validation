import { useState } from 'react'
import './Form.css'
import Joi from 'joi'

const schema = Joi.object({

	name: Joi.string()
		.min(1)
		.required(),

	email: Joi.string()
		.email({ tlds: false })

})

const Form = () => {
	const [data, setData] = useState({ name: '', email: '' })

	return (
		<div className="form">

			<section className="form-field">
				<label> Namn </label>
				<input
					value={data.name}
					onChange={event => setData({ ...data, name: event.target.value })}
					/>
				<p className="error"></p>

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
