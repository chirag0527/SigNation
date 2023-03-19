import axios from "axios";

export const fetchStorage = async () => {
  const res = await axios.get(
    "https://api.ghostnet.tzkt.io/v1/contracts/KT19JrG5773dUhCafQVgcSSA38J5TXsxZfRJ/bigmaps/pet/keys"
  )
  const data = [];
  const dataTest = res.data
  dataTest.forEach((petition)=> {
    console.log(petition.key)
    data.push({'title': petition.value.title,'content': petition.value.content,'hash': petition.value.name, 'signature': petition.value.number_of_signature,'key':petition.key,'img_hash': petition.value.img_hash})
  })
  console.log(data);
  return data
};
