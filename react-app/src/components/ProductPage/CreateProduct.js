import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPosts, createPost } from '../../store/posts';
import { Redirect, NavLink, useHistory } from "react-router-dom";
import { createProductThunk } from '../../store/product';


const CreateProduct = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [name, setName] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState({})
    const [submitted, setSubmitted] = useState(false);

    const user = useSelector(state => state.session.user)

    if (!user) {
        return history.push("/")
    }

    useEffect(() => {
        const error = {}
        if (!name) error.name = "Name is required"
        if (!city) error.city = "City is required"
        if (!state) error.state = "State is required"
        if (!price) error.price = "Price is required"
        if (+price < 0) error.price = "Price must be greater than 0"
        if (!(+price)) error.price = 'Price must be valid number'
        if (!description) error.description = "description is required"
        setErrors(error)
    }, [name, city, state, price, description])

    const submitForm = async (e) => {
        e.preventDefault()

        setSubmitted(true)

        const formData = new FormData()
        formData.append("name", name)
        formData.append("location_city", city)
        formData.append("location_state", state)
        formData.append("price", price)
        formData.append("description", description)

        const data = await dispatch(createProductThunk(formData))
        if (data) {
            history.push("/marketplace")
        }

        setName("")
        setCity("")
        setState("")
        setDescription("")
        setPrice(0)
        setSubmitted(false)



    }

    return (
        <div className='form-container'>
            <form className="prod-form" onSubmit={submitForm}>
                <div className="new-prod-house">
                    <ul>
                        {errors && (
                            <p style={{ color: "red" }}>{errors}</p>
                        )}
                    </ul>
                    <label>
                        <div>Name</div>
                        <input
                            id="p-name"
                            placeholder="Name..."
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>City</div>
                        <input
                            id="p-city"
                            placeholder="City..."
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        ></input>
                    </label>

                    <label>
                        <div>State</div>
                        <input
                            id="p-state"
                            placeholder="State..."
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        <div>Description</div>
                        <textarea
                            id="p-descrip"
                            placeholder="Write a description..."
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>
                    <label>
                        <div>Price</div>
                        <input
                            id="p-price"
                            placeholder="$"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></input>
                    </label>
                </div>
            </form >
            <button type="submit">Submit</button>
        </div >
    )
}

export default CreateProduct
