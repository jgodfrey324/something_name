import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, NavLink, useHistory} from "react-router-dom";
import OpenModalButton from '../OpenModalButton';
import { getAllProducts } from '../../store/product';
import DeleteProductModal from './DeleteProductModal';
import ProductDetails from './ProductDetail'
import './ProductPage.css'
import { getAllProdImages } from '../../store/product_images';


const ProductsLanding = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const productObj = useSelector(state => state.products)
    const user = useSelector(state => state.session.user)
    const prodImages = Object.values(useSelector(state => state.productImages))

    const [sideOpen, setSideOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});

    // console.log("this is our products slice ===================", productObj)
    // console.log("this is our user slice ===================", user)


    useEffect(() => {
        setSideOpen(true)
    }, [selectedProduct]);



    useEffect(() => {
        if (sideOpen === false) setSelectedProduct({})
    }, [sideOpen])



    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getAllProdImages());
    }, [dispatch])



    if (!productObj) return null;

    if (!prodImages) return null;

    const products = Object.values(productObj)



    return (
        <div className='product-page-container'>
            <div className='trouble-makers'>
                <div className="marketplace-and-button">
                    <h2 style={{ color: "white" }}>MarketPlace...</h2>
                    <button style={{backgroundColor: 'whitesmoke'}} onClick={() => history.push('/marketplace/create')}>Create a new Product</button>
                </div>
                <div className='product-view'>
                    <div className='all-products-detail'>
                        {products.toReversed().map(product => {
                            return (
                                <div key={product.id} className='product-preview-tile-house'
                                    onClick={() => setSelectedProduct(product)}>
                                    <div  style={{ color: "white", border: "1px solid white" }}>
                                        <h3>{product.name}</h3>
                                        <p>From <NavLink to={`/users/${product.user.id}`}>{product.user.first_name} {product.user.last_name}</NavLink></p>
                                        <span>{product.location_city}, {product.location_state}</span>
                                        {prodImages.map(image => {
                                            if (image.product_id === product.id) {
                                                return (
                                                    <div key={image.id} >
                                                        <img style={{height: '100px', width: '100px'}}src={`${image.url}`} alt='product image'></img>
                                                    </div>
                                                )
                                            }
                                        })}
                                        <p style={{fontWeight: 'bold'}}>${parseFloat(product.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="product-detail-sidebar">
                <div className="product-detail-sidebar-toggle-house">
                    <div className="product-side-panel-toggle"
                        onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} productId={selectedProduct.id} currentUserId={user.id} />
            </div>
        </div>
    )
}

export default ProductsLanding
