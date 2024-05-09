import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export  function hashed(data: string): string {
    return  bcrypt.hashSync(data, saltOrRounds);
}
export  function compare(data: string, hashedData: string): boolean {
    return  bcrypt.compareSync(data, hashedData);
}

