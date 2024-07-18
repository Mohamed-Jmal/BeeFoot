package com.example.backend.repository;

////import com.bezkoder.springjwt.models.User;
import com.example.backend.models.ERole;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	List<User> findUsersByRoles(ERole roleName);
}
