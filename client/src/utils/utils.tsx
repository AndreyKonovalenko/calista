export default function validEnv(name: string | undefined): string  {
  if (!name){
    throw new Error('missing env')
  }
  return name
}