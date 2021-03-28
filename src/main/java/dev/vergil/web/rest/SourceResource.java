package dev.vergil.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * Source Resource
 */

@RestController
@RequestMapping("/")
public class SourceResource {

    private final Logger log = LoggerFactory.getLogger(SourceResource.class);

    public SourceResource() {}

    /**
     * {@code GET /source} :  returns the repository where the source code is hosted
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body String link.
     */
    @GetMapping("/source")
    public ResponseEntity<String> getSource() {
        log.debug("REST request to get the repository of source");
        return ResponseEntity.ok().body("https://github.com/VergilSkye/desafio-java.git");
    }
}
