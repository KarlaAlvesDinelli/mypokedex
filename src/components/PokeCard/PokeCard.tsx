import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardTitle, FavoriteButton } from "./styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {
  name: string;
  id: number;
};

const PokeCard = ({ name, id }: Props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.includes(id));
  }, [id]);

  const handleFavoriteClick = () => {
    const newIsFavorite = !isFavorite;
    setIsFavorite(newIsFavorite);

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (newIsFavorite) {
      favorites.push(id);
      toast.success(`${name} foi adicionado aos favoritos!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    } else {
      const index = favorites.indexOf(id);
      if (index !== -1) {
        favorites.splice(index, 1);
      }
      toast.error(`${name} foi removido dos favoritos!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Card>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
        alt="id"
        width={100}
        height={100}
        quality={100}
      />
      <CardTitle>{name}</CardTitle>
      <FavoriteButton onClick={handleFavoriteClick}>
        <div className="star-wrapper">
          <FontAwesomeIcon
            icon={faStar}
            color={isFavorite ? "orange" : "gray"}
          />
        </div>
      </FavoriteButton>
    </Card>
  );
};

export default PokeCard;
