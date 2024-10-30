export const productFormValidation = (data) => {
    const errors = {};
    if (data.title === "") {
      errors.title = "Title is required";
    }
  
    if (data.body_html === "") {
      errors.body_html = "Description is required";
    }
  
    if (data.main_image_url === "") {
      errors.main_image_url = "Image is required";
    }
  
    if (data.product_category_id === "") {
      errors.product_category_id = "Category Type is required";
    }
  
    if (data.price === "") {
      errors.price = "Price is required";
    } else if (isNaN(Number(data.price))) {
      errors.price = "Please enter number only";
    }
  
    if (data.size === "") {
      errors.size = "Size is required";
    }
  
    if (data.humidity === "") {
      errors.humidity = "Humidity is required";
    }
  
    if (data.light === "") {
      errors.light = "Light is required";
    }
  
    if (data.temperature === "") {
      errors.temperature = "Temperature is required";
    }
  
    if (data.occasion === "") {
      errors.occasion = "Occasion is required";
    }
  
    return errors;
  };
  
  export const categoryFormValidation = (data) => {
    const errors = {};
  
    if (data.image_url === "") {
      errors.image_url = "Image is required";
    }
  
    if (data.category_name === "") {
      errors.category_name = "Category Name is required";
    }
  
    if (data.description === "") {
      errors.description = "Description is required";
    }
  
    return errors;
  };
  
  export const subCategoryFormValidation = (data) => {
    const errors = {};
  
    if (data.image_url === "") {
      errors.image_url = "Image is required";
    }
  
    if (data.category_name === "") {
      errors.category_name = "Category Name is required";
    }
  
    if (data.parent_category_id === "") {
      errors.parent_category_id = "Category Type is required";
    }
  
    if (data.description === "") {
      errors.description = "Description is required";
    }
  
    return errors;
  };
  
  export const mediaFormValidation = (data) => {
    const errors = {};
  
    if (data.media_url === "") {
      errors.media_url = "Medial Url is required";
    }
  
    if (data.video_thumbnail_url === "") {
      errors.video_thumbnail_url = "Video Url is required";
    }
  
    if (data.media_type === "") {
      errors.media_type = "Media type is required";
    }
  
    return errors;
  };
  