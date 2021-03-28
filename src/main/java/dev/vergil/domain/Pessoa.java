package dev.vergil.domain;

import dev.vergil.domain.enumeration.TipoSexo;
import java.io.Serializable;
import java.time.LocalDate;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.validator.constraints.br.CPF;

/**
 * The Pessoa entity.\n@author Virgílio Stefanin
 */
@Entity
@Table(name = "pessoa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * Nome obrigatorio
     */
    @NotNull
    @Column(name = "nome", nullable = false)
    private String nome;

    /**
     * Sexo enum com tres opcoes, Masculino, Feminino, Outros
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private TipoSexo sexo;

    /**
     * Email nao obrigatorio
     */
    @Email
    @Column(name = "email")
    private String email;

    /**
     * Data de nascimento obrigatoria
     */
    @NotNull
    @Column(name = "data_nascimento", nullable = false)
    private LocalDate dataNascimento;

    /**
     * Naturalidade não obrigatória
     */
    @Column(name = "naturalidade")
    private String naturalidade;

    /**
     * Nacionalidade não obrigatória
     */
    @Column(name = "nacionalidade")
    private String nacionalidade;

    @CPF
    @NotNull
    @Column(name = "cpf", nullable = false, unique = true)
    private String cpf;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pessoa id(Long id) {
        this.id = id;
        return this;
    }

    public String getNome() {
        return this.nome;
    }

    public Pessoa nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public TipoSexo getSexo() {
        return this.sexo;
    }

    public Pessoa sexo(TipoSexo sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(TipoSexo sexo) {
        this.sexo = sexo;
    }

    public String getEmail() {
        return this.email;
    }

    public Pessoa email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDataNascimento() {
        return this.dataNascimento;
    }

    public Pessoa dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getNaturalidade() {
        return this.naturalidade;
    }

    public Pessoa naturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
        return this;
    }

    public void setNaturalidade(String naturalidade) {
        this.naturalidade = naturalidade;
    }

    public String getNacionalidade() {
        return this.nacionalidade;
    }

    public Pessoa nacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
        return this;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public String getCpf() {
        return this.cpf;
    }

    public Pessoa cpf(String cpf) {
        this.cpf = cpf;
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", email='" + getEmail() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", naturalidade='" + getNaturalidade() + "'" +
            ", nacionalidade='" + getNacionalidade() + "'" +
            ", cpf='" + getCpf() + "'" +
            "}";
    }
}
