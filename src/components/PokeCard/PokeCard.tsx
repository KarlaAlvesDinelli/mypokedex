import React from "react";
import Image from "next/image";
import { Card, CardTitle } from "./styled";

type Props = {
  name: string;
  id: number;
};

const PokeCard = ({ name, id }: Props) => {
  console.log(id);
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
    </Card>
  );
};

export default PokeCard;
