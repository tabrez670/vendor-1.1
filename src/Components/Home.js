import React, { useState, useEffect } from "react";
import { Navbar } from "./Navbar";
import { Products } from "./Products";
import { auth, fs } from "../Config/Config";
// import Footer from "./Footer";
// import Banner from "./homecomponents/Banner";

export const Home = (props) => {
  // getting current user uid
  function GetUserUid() {
    const [uid, setUid] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUid(user.uid);
        }
      });
    }, []);
    return uid;
  }

  const CateGory = ()=>{
    return(
      <>
        <button>
          vegetables
        </button>
        <button>
          vegetables
        </button>

        <button>
          vegetables
        </button>

        <button>
          vegetables
        </button>

      </>
    )
  }

  const uid = GetUserUid();

  // getting current user function
  function GetCurrentUser() {
    const [user, setUser] = useState(null);
    useEffect(() => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fs.collection("users")
            .doc(user.uid)
            .get()
            .then((snapshot) => {
              setUser(snapshot.data().FullName);
            });
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  }

  const user = GetCurrentUser();
  // console.log(user);

  // state of products
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // getting products function
    const getProducts = async () => {
      const products = await fs.collection("Products").get();
      const productsArray = [];
      console.log(productsArray)
      for (var snap of products.docs) {
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
          ...data,
        });
        if (productsArray.length === products.docs.length) {
          setProducts(productsArray);
        }
      }


      // const categories = await fs.collection("Categories").get();
      // const CatArray = [];
      // for (var snap of categories.docs) {
      //   var data = snap.data();
      //   data.ID = snap.id;
      //   CatArray.push({
      //     ...data,
      //   });
      //   if (CatArray.length === categories.docs.length) {
      //     setCategories(CatArray);
      //   console.log(categories)

      //   }
      // }
    };

  useEffect(() => {
    getProducts();
    // filter products based on category and setProducts 
    const filteredProducts = products.filter((product) => {
      return product.category === "vegetables";
    }
    );
    setProducts(filteredProducts);
    // TODO: setProducts based on category

  }, []);


  // state of totalProducts
  const [totalProducts, setTotalProducts] = useState(0);
  // getting cart products
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fs.collection("Cart " + user.uid).onSnapshot((snapshot) => {
          const qty = snapshot.docs.length;
          setTotalProducts(qty);
        });
      }
    });
  }, []);

  // globl variable
  let Product;

  // add to cart
  const addToCart = (product) => {
    if (uid !== null) {
      // console.log(product);
      Product = product;
      Product["qty"] = 1;
      Product["TotalProductPrice"] = Product.qty * Product.price;
      fs.collection("Cart " + uid)
        .doc(product.ID)
        .set(Product)
        .then(() => {
          console.log("successfully added to cart");
        });
    } else {
      props.history.push("/login");
    }
  };

  return (
    <>
      <Navbar user={user} totalProducts={totalProducts} />
      <div
      style={{
        display:"flex",
        justifyContent:"space-evenly",
        alignItems:"center",
        padding:"5px"
      }} 
      >
      <button className="btn btn-danger btn-md" to="farmer-Register">vegetables</button> 
      <button className="btn btn-warning btn-md" to="farmer-Register">Daily Needs</button> 
      <button className="btn btn-warning btn-md" to="farmer-Register">Food</button> 
      <button className="btn btn-warning btn-md" to="farmer-Register">Flowers </button> 
      </div>
      <br></br>
      {products.length > 0 && (
        <div className="container-fluid">
          <h1 className="text-center" id="recent">
            Recently Added
          </h1>
          <div className="products-box">
            <Products products={products} addToCart={addToCart}  />
          </div>
        </div>
      )}
      {products.length < 1 && (
        <div className="container-fluid">Please wait....</div>
      )}
      {/* <Footer/> */}
    </>
  );
};
