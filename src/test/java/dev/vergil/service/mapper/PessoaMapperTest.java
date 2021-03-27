package dev.vergil.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PessoaMapperTest {

    private PessoaMapper pessoaMapper;

    @BeforeEach
    public void setUp() {
        pessoaMapper = new PessoaMapperImpl();
    }
}
