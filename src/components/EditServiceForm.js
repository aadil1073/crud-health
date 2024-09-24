import React, { useState, useEffect } from 'react';

const EditServiceForm = ({ selectedService, onUpdate, index }) => {
  const [service, setService] = useState(selectedService);

  useEffect(() => {
    setService(selectedService);
  }, [selectedService]);

  const handleChange = (e) => {
    setService({
      ...service,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(service, index);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Service</h2>
      <div className="form-group">
        <label>Name</label>
        <input type="text" name="name" className="form-control" value={service.name} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" className="form-control" value={service.description} onChange={handleChange} required></textarea>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input type="number" name="price" className="form-control" value={service.price} onChange={handleChange} required />
      </div>
      <button type="submit" className="btn btn-primary">Update Service</button>
    </form>
  );
};

export default EditServiceForm;
