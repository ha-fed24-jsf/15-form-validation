import './Form.css'

const Form = () => {

	return (
		<div className="form">

			<section className="form-field">
				<label> Namn </label>
				<input />
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
