package dev.vergil.service.mapper;

import dev.vergil.domain.*;
import dev.vergil.service.dto.PessoaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Pessoa} and its DTO {@link PessoaDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface PessoaMapper extends EntityMapper<PessoaDTO, Pessoa> {}
