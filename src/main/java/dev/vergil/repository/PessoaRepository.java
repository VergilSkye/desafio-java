package dev.vergil.repository;

import dev.vergil.domain.Pessoa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Pessoa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {
    @Query("SELECT COUNT(p) FROM Pessoa p WHERE p.cpf= ?1 and p.id <> ?2")
    long countCPFAndId(String cpf, Long id);

    @Query("SELECT COUNT(p) FROM Pessoa p WHERE p.cpf = ?1")
    Long countCPF(String cpf);
}
