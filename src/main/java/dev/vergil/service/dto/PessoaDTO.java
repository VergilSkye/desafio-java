package dev.vergil.service.dto;

import dev.vergil.domain.enumeration.TipoSexo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

/**
 * A DTO for the {@link dev.vergil.domain.Pessoa} entity.
 */
@ApiModel(description = "The Pessoa entity.\n@author Virgílio Stefanin")
public class PessoaDTO implements Serializable {

    private Long id;

    /**
     * Nome obrigatorio
     */
    @NotNull
    @ApiModelProperty(value = "Nome obrigatorio", required = true)
    private String nome;

    /**
     * Sexo enum com tres opcoes, Masculino, Feminino, Outros
     */
    @ApiModelProperty(value = "Sexo enum com tres opcoes, Masculino, Feminino, Outros")
    private TipoSexo sexo;

    /**
     * Email nao obrigatorio
     */
    @ApiModelProperty(value = "Email nao obrigatorio")
    private String email;

    /**
     * Data de nascimento obrigatoria
     */
    @NotNull
    @ApiModelProperty(value = "Data de nascimento obrigatoria", required = true)
    private LocalDate dataNascimento;

    /**
     * Naturalidade não obrigatória
     */
    @ApiModelProperty(value = "Naturalidade não obrigatória")
    private String naturalidade;

    /**
     * Nacionalidade não obrigatória
     */
    @ApiModelProperty(value = "Nacionalidade não obrigatória")
    private String nacionaliade;

    @CPF
    @NotNull
    private String cpf;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoSexo getSexo() {
        return sexo;
    }

    public void setSexo(TipoSexo sexo) {
        this.sexo = sexo;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNaturalidade() {
        return naturalidade;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getNacionaliade() {
        return nacionaliade;
    }

    public void setNacionaliade(String nacionaliade) {
        this.nacionaliade = nacionaliade;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PessoaDTO)) {
            return false;
        }

        PessoaDTO pessoaDTO = (PessoaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, pessoaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PessoaDTO{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", email='" + getEmail() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", naturalidade='" + getNaturalidade() + "'" +
            ", nacionaliade='" + getNacionaliade() + "'" +
            ", cpf='" + getCpf() + "'" +
            "}";
    }
}
