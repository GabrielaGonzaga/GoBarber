# GoBarber

Projeto desenvolvido durante o curso de NojeJS Back-end, TDD, SOLID e Typeorm, pela RocketSeat 

## API Docmuentation


### Appointments
##### Create a new appointment
```http
  POST /appointments
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `string` |  by the session **(mandatory)** |
| `provider_id` | `string` | the provider/baber id that will accomplish the service **(mandatory)** |
| `date` | `date` | the appointment date **(mandatory)** |


### Providers
##### List the providers month availability
```http
  GET /providers/:provider_id/month-availability
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `string` |  by the session **(mandatory)** |
| `month` | `int` | **(mandatory)** |
| `year` | `int` | **(mandatory)** |

##### List the providers day availability
```http
   GET /providers/:provider_id/day-availability
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `string` |  by the session **(mandatory)** |
| `day` | `int` | **(mandatory)** |
| `month` | `int` | **(mandatory)** |
| `year` | `int` | **(mandatory)** |

### Users
##### Create a new user
```http
  POST /users
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | The user name **(mandatory)**|
| `email` | `string` | The user email **(mandatory)**|
| `password` | `string` |The user password **(mandatory)**|

#### Password
##### Send and forgot recover email with a token
```http
  POST /password/forgot
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | The user email to recover**(mandatory)**|

##### Reset the user password
```http
  POST /password/reset
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `password` | `string` | The user password **(mandatory)**|
| `token` | `string` | The token receveid by email **(mandatory)**|


#### Avatar
##### Update the user avatar
```http
  PATCH /users/avatar
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `user_id` | `string` |  by the session **(mandatory)** |
| `avatarFilename` | `string` | The name of the file that'll be the avatar **(mandatory)**|


#### Sessions
##### Create a new user session (login)
```http
  POST /sessions
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` |  The user email **(mandatory)** |
| `password` | `string` | The user password **(mandatory)**|

#### Profiles

##### List the logged user informations
```http
  GET /profile
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `string` |  by the session **(mandatory)** |

##### Update the logged user informations
```http
  Put /profile
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `user_id` | `string` |  by the session **(mandatory)** |
| `name` | `string` |  The user name **(mandatory)** |
| `email` | `string` |  The user email **(mandatory)** |
| `old_password` | `string` | The user old password **(mandatory)**|
| `password` | `string` | The user password **(mandatory)**|

