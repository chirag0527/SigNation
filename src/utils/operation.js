import { tezos } from "./tezos";

export const writing_pet_operation = async (image_hash,desc,title) => {
  try {
    const contractInstance = await tezos.wallet.at("KT19JrG5773dUhCafQVgcSSA38J5TXsxZfRJ");
    const op = await contractInstance.methods.writing_pet(image_hash,desc,title).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
}; 

export const signing_pet_operation = async (number) => {
  try {
    const contractInstance = await tezos.wallet.at("KT19JrG5773dUhCafQVgcSSA38J5TXsxZfRJ");
    const op = await contractInstance.methods.signature(number).send();
    await op.confirmation(1);
  } catch (err) {
    throw err;
  }
}; 