import React from 'react';

const ServiceList = ({ services, onEdit, onDelete }) => {
  return (
    <div className="ServiceList">
      <ul>
        {services.map((service, index) => (
          <li key={index}>
            <h5>{service.name}</h5>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <button className="btn-warning" onClick={() => onEdit(index)}>Edit</button>
            <button className="btn-danger" onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
