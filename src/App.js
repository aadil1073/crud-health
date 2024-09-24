import React, { useState, useEffect } from 'react';
import ServiceList from './components/ServiceList';
import AddServiceForm from './components/AddServiceForm';
import EditServiceForm from './components/EditServiceForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const defaultServices = [
    { name: 'General Checkup', description: 'Basic health checkup and consultation', price: '50' },
    { name: 'Dental Cleaning', description: 'Teeth cleaning and oral hygiene services', price: '80' }
  ];

  // State for services, editing state, and feedback messages
  const [services, setServices] = useState([]);
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const storedServices = localStorage.getItem('services');
    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(defaultServices);
    }
  }, []);

  // Update local storage whenever services change
  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem('services', JSON.stringify(services));
    }
  }, [services]);

  // Add a new service and display feedback
  const addService = (service) => {
    setServices([...services, service]);
    setMessage('Service added successfully!');
    setTimeout(() => setMessage(null), 3000); // Hide message after 3 seconds
  };

  // Update an existing service and display feedback
  const updateService = (updatedService, index) => {
    const updatedServices = [...services];
    updatedServices[index] = updatedService;
    setServices(updatedServices);
    setIsEditing(false);
    setMessage('Service updated successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  // Delete a service and display feedback
  const deleteService = (index) => {
    const updatedServices = services.filter((_, i) => i !== index);
    setServices(updatedServices);
    setMessage('Service deleted successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  // Start editing a service
  const editService = (index) => {
    setEditingServiceIndex(index);
    setIsEditing(true);
  };

  return (
    <div className="App container">
      <header className="text-center my-4">
        <h1>Healthcare Service</h1>
      </header>

      {/* Display feedback message */}
      {message && <div className="alert alert-success">{message}</div>}

      <main>
        <div className="row">
          <div className="col-md-6">
            {isEditing ? (
              <EditServiceForm
                selectedService={services[editingServiceIndex]}
                index={editingServiceIndex}
                onUpdate={updateService}
              />
            ) : (
              <AddServiceForm onAdd={addService} />
            )}
          </div>
          <div className="col-md-6">
            <ServiceList services={services} onEdit={editService} onDelete={deleteService} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
