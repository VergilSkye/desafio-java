package dev.vergil.domain;

import static org.assertj.core.api.Assertions.assertThat;

import dev.vergil.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PessoaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pessoa.class);
        Pessoa pessoa1 = new Pessoa();
        pessoa1.setId(1L);
        Pessoa pessoa2 = new Pessoa();
        pessoa2.setId(pessoa1.getId());
        assertThat(pessoa1).isEqualTo(pessoa2);
        pessoa2.setId(2L);
        assertThat(pessoa1).isNotEqualTo(pessoa2);
        pessoa1.setId(null);
        assertThat(pessoa1).isNotEqualTo(pessoa2);
    }
}
