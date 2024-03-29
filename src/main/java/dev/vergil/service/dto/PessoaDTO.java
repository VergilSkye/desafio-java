package dev.vergil.service.dto;

import dev.vergil.domain.AbstractAuditingEntity;
import dev.vergil.domain.enumeration.TipoSexo;
import io.swagger.v3.oas.annotations.media.Schema;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;
import javax.validation.constraints.*;
import org.hibernate.validator.constraints.br.CPF;

/**
 * A DTO for the {@link dev.vergil.domain.Pessoa} entity.
 */
@Schema(description = "The Pessoa entity.\n@author Virgílio Stefanin")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PessoaDTO extends AbstractAuditingEntity implements Serializable {

    private Long id;

    /**
     * Nome obrigatorio
     */
    @NotNull
    @Schema(description = "Nome obrigatorio", required = true)
    private String nome;

    /**
     * Sexo enum com tres opcoes, Masculino, Feminino, Outros
     */
    @Schema(description = "Sexo enum com tres opcoes, Masculino, Feminino, Outros")
    private TipoSexo sexo;

    /**
     * Email nao obrigatorio
     */
    @Schema(description = "Email nao obrigatorio")
    private String email;

    /**
     * Data de nascimento obrigatoria
     */
    @NotNull
    @Schema(description = "Data de nascimento obrigatoria", required = true)
    private LocalDate dataNascimento;

    /**
     * Naturalidade não obrigatória
     */
    @Schema(description = "Naturalidade não obrigatória")
    private String naturalidade;

    /**
     * Nacionalidade não obrigatória
     */
    @Schema(description = "Nacionalidade não obrigatória")
    private String nacionalidade;

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

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
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
            ", nacionalidade='" + getNacionalidade() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", createAt='" + getCreatedBy() + "'" +
            ", createdBy='" + getCreatedDate() + "'" +
            ", updateAt='" + getLastModifiedDate() + "'" +
            ", updateBy='" + getLastModifiedBy() + "'" +
            "}";
    }
}
