package configuration;

import com.google.inject.AbstractModule;
import service.RowRepository;
import service.RowRepositoryMemoryImpl;

/**
 * Created by radoslawl on 12/07/16.
 */
public class DataResourceModule extends AbstractModule {
    @Override
    protected void configure() {
        bind(RowRepository.class).to(RowRepositoryMemoryImpl.class);
    }
}
