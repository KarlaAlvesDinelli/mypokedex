export function getId(url: string) {
  const partes = url.split("/");
  const ultimoElemento = partes[partes.length - 2];
  const numero = parseInt(ultimoElemento, 10);

  if (!isNaN(numero)) {
    return numero;
  } else {
    return -1;
  }
}
