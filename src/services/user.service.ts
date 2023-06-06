import { User } from "@models/index";


export const createUser = async (object: any) => {
  return User.create(object);
};

export const fetchUsers = async () => {
  return User.findAll();
};
export const findUserByPK = async (id: number | string) => {
  return User.findByPk(id);
};

export const findUserByEmail = async (email: string) => {
  return User.findOne({
    where: { email: email?.toString()?.toLowerCase() },
  });
};

export const deleteUser = (id: number | string) => {
  return User.destroy({ where: { id: id } })
}

