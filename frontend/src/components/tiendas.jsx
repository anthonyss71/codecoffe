import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Tiendas = () => {
  const locales = [
    {
      id: 1,
      nombre: "Coffee Miraflores",
      direccion: "Av. Principal 123",
      horario: "8:00 AM - 12:00 PM",
      telefono: "01-3648290",
      imagen: "https://i.pinimg.com/736x/2f/7e/c6/2f7ec646399483f12f86de65d80a1c10.jpg"
    },
    {
      id: 2, 
      nombre: "Coffee Barranco",
      direccion: "Calle Central 456",
      horario: "8:00 AM - 11:00 PM",
      telefono: "01-4567295",
      imagen: "https://i.pinimg.com/736x/1c/e7/0b/1ce70beb85317368e50c83eab01cf7c2.jpg"
    },
    {
      id: 3,
      nombre: "Coffe San Luis",
      direccion: "Plaza Mayor 789",
      horario: "6:30 AM - 10:00 PM",
      telefono: "01-7775550",
      imagen: "https://i.pinimg.com/736x/7f/d2/1a/7fd21ab7fa7732889278e756a9caee79.jpg"
    },
    {
        id: 4,
        nombre: "Cofee Centro",
        direccion: "Plaza Centro 779",
        horario: "6:30 AM - 10:00 PM",
        telefono: "01-8882220",
        imagen: "https://i.pinimg.com/736x/c4/26/84/c426849369ec6ec83cf140e4af46a327.jpg"
      },
      {
        id: 5,
        nombre: "Coffe Molina",
        direccion: "Av.Picapiedra 560",
        horario: "6:30 AM - 10:00 PM",
        telefono: "01-6820022",
        imagen: "https://i.pinimg.com/736x/f9/43/51/f94351df57f178106a5c29504a92ba6a.jpg"
      },

      {
        id: 6,
        nombre: "Coffe UTP Lima Sur",
        direccion: "Villa el Salvador",
        horario: "8:00 AM - 10:00 PM",
        telefono: "01-6538011",
        imagen: "https://i.pinimg.com/736x/c5/14/65/c51465eadf1c4dc00c9fdbadb72dd60d.jpg"
      }
  ];

  return (
    <div className="container py-5 " style={{marginTop:'110px'}}>
      <h1 className="text-center mb-5">Nuestras Tiendas</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {locales.map((local) => (
          <div key={local.id} className="col">
            <div className="card h-100 shadow-sm">
              <img 
                src={local.imagen} 
                className="card-img-top" 
                alt={local.nombre}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{local.nombre}</h5>
                <div className="card-text">
                  <p className="mb-1">
                    <i className="bi bi-geo-alt-fill me-2"></i>
                    {local.direccion}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-clock-fill me-2"></i>
                    {local.horario}
                  </p>
                  <p className="mb-1">
                    <i className="bi bi-telephone-fill me-2"></i>
                    {local.telefono}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiendas; 