import React, { useState } from 'react'
import Input from "../../components/Inputs/Input"

const AddItemForm = ({onAddItem}) => {
    const [item, setItem] = useState({
        name: "",
        category: "",
        quantity: "",
        unit: '',
        purchaseDate: "",
        expirationDate: "",
        consumed: "",
        wasteReason: "",
    })

    const handleChange = (key, value) => setItem({...item, [key]: value});
  return (
    <div>
        <Input 
            value={item.name}
            onChange={({ target }) => handleChange("name", target.value)}
            label="Name"
            placeholder="Milk, Carrot, etc."
            type="text"
        />
        <Input 
            value={item.category}
            onChange={({ target }) => handleChange("category", target.value)}
            label="Category"
            selectOptions={["Vegetables", "Fruits", "Dairy", "Meat", "Grains", "Beverages", "Others"]}
            type="text"
        />
        <Input 
            value={item.quantity}
            onChange={({ target }) => handleChange("quantity", target.value)}
            label="Quantity"
            placeholder="Min. is 1"
            type="text"
        />
        <Input 
            value={item.unit}
            onChange={({ target }) => handleChange("unit", target.value)}
            label="Unit"
            selectOptions={["kg", "g", "liters", "ml", "pieces"]}
            type="text"
        />
        <Input 
            value={item.purchaseDate}
            onChange={({ target }) => handleChange("purchaseDate", target.value)}
            label="Purchase Date"
            placeholder=""
            type="date"
        />
        <Input 
            value={item.expirationDate}
            onChange={({ target }) => handleChange("expirationDate", target.value)}
            label="Expiration Date"
            placeholder=""
            type="date"
        />
        <Input 
            value={item.consumed}
            onChange={({ target }) => handleChange("consumed", target.value)}
            label="Consume Status"
            selectOptions={["true", "false"]}
            type="text"
        />
        <Input 
            value={item.wasteReason}
            onChange={({ target }) => handleChange("wasteReason", target.value)}
            label="Waste Status"
            selectOptions={["Expired", "Spoiled", "Unused", "Not Wasted"]}
            type="text"
        />

        <div className='flex justify-end mt-6'>
            <button 
                type='button'
                className='bg-purple-400 rounded-2xl text-[15px] border border-gray-600 p-[7px]'
                onClick={()=>onAddItem(item)}
            >
                Add Item
            </button>
        </div>
    </div>
  )
}

export default AddItemForm