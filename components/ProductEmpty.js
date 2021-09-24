import { EmptyState } from '@shopify/polaris'
import React from 'react'

function ProductEmpty({setIsOpen}) {
    return (
        <EmptyState
          heading="Manage the products you want to display"
          action={{
            content: 'Select products',
            onAction: () => setIsOpen(true),
          }}
          secondaryAction={{ content: 'Learn more', url: 'https://help.shopify.com' }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
          <p>Select the products you want to use on your banner</p>
        </EmptyState>
    )
}

export default ProductEmpty
