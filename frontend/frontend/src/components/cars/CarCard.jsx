const CarCard = ({ car }) => {
    return (
      <div className="border rounded-lg p-4 shadow hover:shadow-md transition duration-200">
        {car.image && (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
        )}
        <h2 className="text-lg font-semibold">{car.name}</h2>
        <p className="text-sm text-muted-foreground">{car.category}</p>
        <p className="mt-2 font-bold text-primary">${car.price}/day</p>
      </div>
    )
  }
  