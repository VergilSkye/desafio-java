package dev.vergil.service;

import dev.vergil.domain.Pessoa;
import dev.vergil.repository.PessoaRepository;
import dev.vergil.service.dto.PessoaDTO;
import dev.vergil.service.mapper.PessoaMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pessoa}.
 */
@Service
@Transactional
public class PessoaService {

    private final Logger log = LoggerFactory.getLogger(PessoaService.class);

    private final PessoaRepository pessoaRepository;

    private final PessoaMapper pessoaMapper;

    public PessoaService(PessoaRepository pessoaRepository, PessoaMapper pessoaMapper) {
        this.pessoaRepository = pessoaRepository;
        this.pessoaMapper = pessoaMapper;
    }

    /**
     * Save a pessoa.
     *
     * @param pessoaDTO the entity to save.
     * @return the persisted entity.
     */
    public PessoaDTO save(PessoaDTO pessoaDTO) {
        log.debug("Request to save Pessoa : {}", pessoaDTO);
        Pessoa pessoa = pessoaMapper.toEntity(pessoaDTO);
        pessoa = pessoaRepository.save(pessoa);
        return pessoaMapper.toDto(pessoa);
    }

    /**
     * Partially update a pessoa.
     *
     * @param pessoaDTO the entity to update partially.
     * @return the persisted entity.
     */
    public Optional<PessoaDTO> partialUpdate(PessoaDTO pessoaDTO) {
        log.debug("Request to partially update Pessoa : {}", pessoaDTO);

        return pessoaRepository
            .findById(pessoaDTO.getId())
            .map(
                existingPessoa -> {
                    pessoaMapper.partialUpdate(existingPessoa, pessoaDTO);
                    return existingPessoa;
                }
            )
            .map(pessoaRepository::save)
            .map(pessoaMapper::toDto);
    }

    /**
     * Get all the pessoas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<PessoaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Pessoas");
        return pessoaRepository.findAll(pageable).map(pessoaMapper::toDto);
    }

    /**
     * Get one pessoa by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<PessoaDTO> findOne(Long id) {
        log.debug("Request to get Pessoa : {}", id);
        return pessoaRepository.findById(id).map(pessoaMapper::toDto);
    }

    /**
     * Delete the pessoa by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Pessoa : {}", id);
        pessoaRepository.deleteById(id);
    }
}
