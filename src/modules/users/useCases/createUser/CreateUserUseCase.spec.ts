import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase"



let createUserUseCase: CreateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
describe('Create user', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('should be able to create a new user', async () => {

    const user = await createUserUseCase.execute({
      name: "New User",
      email: "user@user.com",
      password: "1234"
    });
    expect(user).toHaveProperty("id");
  })

  it('should not be able to create a new user with the same email', () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: "New User",
        email: "user@user.com",
        password: "1234"
      });
      await createUserUseCase.execute({
        name: "New User2",
        email: "user@user.com",
        password: "12345"
      });
    }).rejects.toBeInstanceOf(CreateUserError);
  })

})
