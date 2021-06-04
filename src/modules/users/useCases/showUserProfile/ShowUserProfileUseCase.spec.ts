import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";


let usersRepository: IUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;


describe("Show User Profile", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(usersRepository);
  });

  it("should be able to show a user", async () => {
    const user = await usersRepository.create({
      name: 'user test',
      email: "teste@teste.com",
      password: "1234",
    });

    const response = await showUserProfileUseCase.execute(user.id as string);

    expect(response).toBe(user);
  });
  it("should not be able to show a non-existing user", () => {
    expect(async () => {
      await showUserProfileUseCase.execute("id invalid");
    }).rejects.toBeInstanceOf(ShowUserProfileError);

  });
})
