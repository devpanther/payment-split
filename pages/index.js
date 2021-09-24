import { ResourcePicker } from "@shopify/app-bridge-react";
import { EmptyState, Page } from "@shopify/polaris";
import React, { useEffect, useState } from 'react'
import ProductEmpty from "../components/ProductEmpty";
import ProductPage from "../components/ProductPage";
import store from 'store-js';

function index({ shop })
{
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsId, setproductsId] = useState([]);

  useEffect(() => {
    const productList = store.get(`${shop}-products`);
    if(productList){
      setProducts(productList)
    }
  }, [])

  useEffect(() => {
    const ids = products.map(product => {
      return {
        id: product.id
      }
    });
    setproductsId(ids);
  }, [products])

  const handleProductSelection = (payload) =>
  {
    setIsOpen(false);
    setProducts(payload.selection);
    store.set(`${shop}-products`, payload.selection)
  }

  return (
    <>
      <ResourcePicker
        resourceType="Product"
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onSelection={handleProductSelection}
        initialSelectionIds={productsId}
      />
      {products.length > 0 ?
        <ProductPage setIsOpen={setIsOpen} products={products}/> 
        :
        <ProductEmpty setIsOpen={setIsOpen}/>
      }
    </>
  )
}

export default index;
