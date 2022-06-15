
# GoBarber

Projeto desenvolvido durante o curso de NojeJS Back-end, TDD, SOLID e Typeorm, pela RocketSeat 

## API Docmuentation

#### Create a new appointment
```http
  POST /appointments
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `provider_id` | `string` | the provider/baber id that will accomplish the service **(mandatory)** |
| `date` | `date` | the appointment date **(mandatory)** |

#### Create a new user
```http
  POST /users
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | The user name **(mandatory)**|
| `email` | `string` | The user email **(mandatory)**|
| `password` | `string` |The user password **(mandatory)**|


#### Create a new user session (login)
```http
  POST /sessions
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` |  The user email **(mandatory)** |
| `password` | `string` | The user password **(mandatory)**|


#### Update the user avatar
```http
  PATCH /users/avatar
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_id` | `string` |  The user id **(mandatory)** |
| `avatarFilename` | `string` | The name of the file that'll be the avatar **(mandatory)**|


