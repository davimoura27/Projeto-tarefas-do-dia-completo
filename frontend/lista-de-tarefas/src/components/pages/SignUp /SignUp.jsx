import { useState } from "react";
import style from "./signUp.module.css";
import PropTypes from "prop-types";

const SignUp = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginCadastro = async (e) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Usuário registrado com sucesso! Verifique o email.");
        onClose();
      } else {
        const errorData = await response.json();
        alert(`Erro ao cadastrar: ${errorData.message}`);
      }
    } catch (error) {
      alert("Erro ao se conectar com o servidor", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  if (!isOpen) return null;

  return (
    <>
  
    
        <h1 className={style.title}>Crie sua conta</h1>
        <form onSubmit={handleLoginCadastro}>
          <div className={style.inputGroup}>
            <label htmlFor="fullName">Nome completo:</label>
            <input
              type="text"
              id="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="username">Nome de usuário:</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>

          <div className={style.inputGroup}>
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={isLoading}
            />
          </div>
          <button className={style.submitButton} type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Criar conta"}
          </button>
        </form>
        </>
  );
};

SignUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignUp;
