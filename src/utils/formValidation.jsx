export const productFormValidation = (data) => {
    const errors = {};
    if(data.title === ""){
        errors.title = 'Title is required';
    }

    if(data.body_html === ""){
        errors.body_html = 'Description is required';
    }

    if(data.main_image_url === ""){
        errors.main_image_url = 'Image is required';
    }

    if(data.product_category_id === ""){
        errors.product_category_id = 'Category Type is required';
    }

    if(data.price === ""){
        errors.price = 'Price is required';
    }else if(isNaN(Number(data.price))){
        errors.price = 'Please enter number only';
    }

    return errors;
};

export const categoryFormValidation = (data) => {
    const errors = {};

    if(data.image_url === ""){
        errors.image_url = 'Image is required';
    }

    if(data.category_name === ""){
        errors.category_name = 'Category Name is required';
    }

    if(data.description === ""){
        errors.description = 'Description is required';
    }

    return errors;
}

